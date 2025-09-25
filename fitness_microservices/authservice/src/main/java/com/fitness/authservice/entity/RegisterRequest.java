package main.java.com.fitness.authservice.entity;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
public class RegisterRequest {
  @Email
  @NotBlank
  private String email;

  @NotBlank
  @Size(min = 8, max = 128)
  private String password;

  private String firstName;
  private String lastName;
}

