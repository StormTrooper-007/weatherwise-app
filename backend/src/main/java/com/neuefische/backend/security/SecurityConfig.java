package com.neuefische.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;
import org.springframework.security.web.session.HttpSessionEventPublisher;

@EnableWebSecurity
@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        CsrfTokenRequestAttributeHandler requestHandler = new CsrfTokenRequestAttributeHandler();
        requestHandler.setCsrfRequestAttributeName(null);

        return http.csrf(csrf -> csrf
                        .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                        .csrfTokenRequestHandler(requestHandler))
                .httpBasic(Customizer.withDefaults())
                .sessionManagement()
                .sessionFixation().migrateSession()
                .sessionCreationPolicy(SessionCreationPolicy.ALWAYS)
                //.invalidSessionUrl("/login?invalidSession")
                .and()
                .authorizeHttpRequests(httpRequests ->
                        httpRequests
                                .requestMatchers(HttpMethod.GET, "/api/todos").authenticated()
                                .requestMatchers(HttpMethod.POST, "/api/todos").authenticated()
                                .requestMatchers(HttpMethod.GET, "/api/todos/upcoming").permitAll()
                                .requestMatchers(HttpMethod.DELETE, "/api/todos/*").authenticated()
                                .requestMatchers(HttpMethod.PUT, "/api/todos/*").authenticated()
                                .requestMatchers("/api/todos/**").authenticated()
                                .requestMatchers("/api/timedout/**").authenticated()
                                .requestMatchers("/api/weather/**").authenticated()
                                .anyRequest().permitAll()
                )
                .logout(logout -> logout.logoutUrl("/api/users/logout")
                )
                .formLogin(Customizer.withDefaults())
                .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8();
    }

    @Bean
    public HttpSessionEventPublisher httpSessionEventPublisher() {
        return new HttpSessionEventPublisher();
    }
}

