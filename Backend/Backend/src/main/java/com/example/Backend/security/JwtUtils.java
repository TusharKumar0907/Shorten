package com.example.Backend.security;


import java.security.Key;
// import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.stream.Collectors;

import javax.crypto.SecretKey;

// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.example.Backend.service.UserDetailsImpl;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;

@Component
public class JwtUtils {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration}")
    private int jwtExpirations;

    public String getSecret() {
        return jwtSecret;
    }

    public String getJwtFromHeader(HttpServletRequest req) {
        String bearerToken = req.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    public String generateToken(UserDetailsImpl userDetails){
        String username = userDetails.getUsername();
        String roles = userDetails.getAuthorities().stream()
                       .map(authority -> authority.getAuthority())
                       .collect(Collectors.joining(","));
       
        return Jwts.builder()
        .subject(username)
        .claim("roles", roles)
        .issuedAt(new Date())
        .expiration(new Date((System.currentTimeMillis() + jwtExpirations)))
        .signWith(key())
        .compact();
    }

    private Key key() {
        byte[] keyBytes = Decoders.BASE64.decode(jwtSecret);
        return  Keys.hmacShaKeyFor(keyBytes);
    }
    

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser()
            .verifyWith((SecretKey) key())
            .build()
            .parseSignedClaims(authToken);
            return true;
        } catch (MalformedJwtException e) {
            throw new RuntimeException(e);
        } catch (ExpiredJwtException e) {
            throw new RuntimeException(e);
        } catch (UnsupportedJwtException e) {
            throw new RuntimeException(e);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException(e);
        }
    }


    public String getUserNameFromJwtToken(String token) {
        return Jwts.parser()
                   .verifyWith((SecretKey) key())
                   .build()
                   .parseSignedClaims(token)
                   .getPayload()
                   .getSubject();
    }

}
