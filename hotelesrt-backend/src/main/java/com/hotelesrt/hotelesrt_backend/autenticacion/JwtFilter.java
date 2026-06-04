package com.hotelesrt.hotelesrt_backend.autenticacion;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.hotelesrt.hotelesrt_backend.autenticacion.JwtUtil;
import com.hotelesrt.hotelesrt_backend.autenticacion.Usuario;
import com.hotelesrt.hotelesrt_backend.autenticacion.UsuarioRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter{



    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override 
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String cabecera = request.getHeader("Authorization");

        if(cabecera == null || !cabecera.startsWith("Bearer ")){
            filterChain.doFilter(request, response);
            return;
        }

        // Extraer del string entero la palabra Bearer de antes
        String token = cabecera.substring(7);
        String email = jwtUtil.extraerEmail(token);

        if(email != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            // busca el usuario
            Usuario usuario = usuarioRepository
                                    .findByEmail(email)
                                    .orElse(null);
            if (usuario != null && jwtUtil.esTokenValido(token, usuario)) {

                UsernamePasswordAuthenticationToken tokenautenticacion = 
                    new UsernamePasswordAuthenticationToken(
                        usuario,
                        null,
                        usuario.getAuthorities()
                    );
                tokenautenticacion.setDetails(
                    new WebAuthenticationDetailsSource()
                        .buildDetails(request)  
                );
                SecurityContextHolder.getContext().setAuthentication(tokenautenticacion);
            }
        }


        filterChain.doFilter(request, response);
     }    
}
