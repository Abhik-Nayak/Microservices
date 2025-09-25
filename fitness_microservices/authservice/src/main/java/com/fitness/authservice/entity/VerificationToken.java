package main.java.com.fitness.authservice.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "verification_tokens")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VerificationToken {
  @Id
  @GeneratedValue
  private UUID id;

  @Column(nullable = false, unique = true)
  private String token;

  @OneToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  private Instant expiryDate;

  private boolean used = false;
}
