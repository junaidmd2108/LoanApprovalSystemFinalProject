package com.junaid.backend.filter;

import com.junaid.backend.service.MyUserDetailsService;
import com.junaid.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private MyUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String uri = request.getRequestURI();
        String authorizationHeader = request.getHeader("Authorization");
        System.out.println(">>> [JwtFilter] Request URI: " + uri);
        System.out.println(">>> [JwtFilter] Authorization header: " + authorizationHeader);

        String username = null;
        String jwt = null;

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7);
            System.out.println(">>> [JwtFilter] Extracted JWT: " + jwt);
            try {
                username = jwtUtil.extractUsername(jwt);
                System.out.println(">>> [JwtFilter] Extracted username: " + username);
            } catch (Exception e) {
                System.out.println(">>> [JwtFilter] Error extracting username: " + e.getMessage());
            }
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            System.out.println(">>> [JwtFilter] Loaded userDetails: " + userDetails.getUsername());
            boolean valid = jwtUtil.validateToken(jwt, userDetails.getUsername());
            System.out.println(">>> [JwtFilter] Token valid? " + valid);
            if (valid) {
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
                System.out.println(">>> [JwtFilter] Authentication set in context");
            }
        }

        filterChain.doFilter(request, response);
    }
}