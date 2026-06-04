package com.hotelesrt.hotelesrt_backend.autenticacion;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration}")
    private Long expiration;


    // metodo de JWT para verificar
    private Claims extraerClaims(String token){
        return Jwts.parserBuilder()
                    .setSigningKey(Keys.hmacShaKeyFor(secretKey.getBytes()))
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
    }


    public String generarToken(Usuario usuario){
        return Jwts.builder()
                .setSubject(usuario.getEmail())
                .claim("rol", usuario.getRol().name())
                .claim("id", usuario.getId())
                .claim("nombre", usuario.getNombre())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(Keys.hmacShaKeyFor(secretKey.getBytes()))
                .compact();
    }

    public String extraerEmail(String token) {
        return extraerEmail(token).getSubject();
    }
    public String extraerRol(String token) {
        return extraerClaims(token).get("rol", String.class);
    }
    public Long extraerID(String token) {
        return extraerClaims(token).get("id", Long.class);
    }
    private boolean estaExpirado(String token) {
        return extraerClaims(token).getExpiration().before(new Date());
    }

    public boolean esTokenValido(String token, Usuario usuario) {
        String email = extraerEmail(token);
        return email.equals(usuario.getEmail()) && !estaExpirado(token);
    }
}
