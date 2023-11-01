package krisschaaf.schuettieshome.security;

import krisschaaf.schuettieshome.api.Api;
import krisschaaf.schuettieshome.configuration.SpaWebFilter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.oauth2.core.DelegatingOAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.web.util.matcher.AntPathRequestMatcher.antMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Value("${auth0.audience}")
    private String audience;

    @Value("${spring.security.oauth2.resourceserver.jwt.issuer-uri}")
    private String issuer;

    //https://docs.spring.io/spring-security/reference/servlet/configuration/java.html
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .authorizeRequests((authorizeRequests) -> authorizeRequests
                        .requestMatchers(antMatcher(HttpMethod.GET, Api.CUSTOMER_PATH)).hasAuthority(Api.PERMISSION_READ_CUSTOMERS)
                        .requestMatchers(antMatcher(HttpMethod.POST, Api.CUSTOMER_PATH)).hasAuthority(Api.PERMISSION_WRITE_CUSTOMERS)
                        .requestMatchers(antMatcher(HttpMethod.PUT, Api.CUSTOMER_PATH)).hasAuthority(Api.PERMISSION_WRITE_CUSTOMERS)
                        .requestMatchers(antMatcher(HttpMethod.DELETE, Api.CUSTOMER_PATH)).hasAuthority(Api.PERMISSION_WRITE_CUSTOMERS)

                        .requestMatchers(antMatcher(HttpMethod.GET, Api.CAR_PATH)).hasAuthority(Api.PERMISSION_READ_CARS)
                        .requestMatchers(antMatcher(HttpMethod.POST, Api.CAR_PATH)).hasAuthority(Api.PERMISSION_WRITE_CARS)
                        .requestMatchers(antMatcher(HttpMethod.PUT, Api.CAR_PATH)).hasAuthority(Api.PERMISSION_WRITE_CARS)
                        .requestMatchers(antMatcher(HttpMethod.DELETE, Api.CAR_PATH)).hasAuthority(Api.PERMISSION_WRITE_CARS)

                        .requestMatchers(antMatcher(HttpMethod.GET, Api.BILL_PATH)).hasAuthority(Api.PERMISSION_READ_BILLS)
                        .requestMatchers(antMatcher(HttpMethod.POST, Api.BILL_PATH)).hasAuthority(Api.PERMISSION_WRITE_BILLS)
                        .requestMatchers(antMatcher(HttpMethod.PUT, Api.BILL_PATH)).hasAuthority(Api.PERMISSION_WRITE_BILLS)
                        .requestMatchers(antMatcher(HttpMethod.DELETE, Api.BILL_PATH)).hasAuthority(Api.PERMISSION_WRITE_BILLS)
                        .anyRequest().authenticated())
                .cors((cors) ->
                        cors.configurationSource(corsConfigurationSource()))
                .oauth2ResourceServer((oauth2ResourceServer) ->
                        oauth2ResourceServer.jwt((jwt) -> jwt.decoder(jwtDecoder())
                                .jwtAuthenticationConverter(jwtAuthenticationConverterWithCustomClaimName("permissions"))))
                .httpBasic(Customizer.withDefaults())
                .addFilterAfter(new SpaWebFilter(), BasicAuthenticationFilter.class);
        return http.build();
    }

    private static JwtAuthenticationConverter jwtAuthenticationConverterWithCustomClaimName(String customClaimName) {
        var jwtGrantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
        jwtGrantedAuthoritiesConverter.setAuthoritiesClaimName(customClaimName);
        var jwtAuthenticationConverter = new JwtAuthenticationConverter();
        jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(jwtGrantedAuthoritiesConverter);
        return jwtAuthenticationConverter;
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("https://schuetties-home.de/", "http://localhost:4200/"));
        configuration.setAllowedMethods(Arrays.asList("GET","POST", "PUT", "DELETE"));
        configuration.setAllowedHeaders(Arrays.asList("authorization", "content-type"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    JwtDecoder jwtDecoder() {
        NimbusJwtDecoder jwtDecoder = JwtDecoders.fromOidcIssuerLocation(issuer);

        OAuth2TokenValidator<Jwt> audienceValidator = new AudienceValidator(audience);
        OAuth2TokenValidator<Jwt> withIssuer = JwtValidators.createDefaultWithIssuer(issuer);
        OAuth2TokenValidator<Jwt> withAudience = new DelegatingOAuth2TokenValidator<>(withIssuer, audienceValidator);

        jwtDecoder.setJwtValidator(withAudience);
        return jwtDecoder;
    }
}