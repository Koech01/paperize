package com.paperize.paperize_server.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.commons.lang3.RandomStringUtils;

import java.util.Random;
import java.util.UUID;

@Entity
@Getter
@NoArgsConstructor
public class VerificationCodeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String code;

    @Setter
    private boolean emailSent = false;

    @OneToOne(mappedBy = "verificationCode")
    private UserEntity user;

    public VerificationCodeEntity(UserEntity user) {
        this.user = user;
        this.code = RandomStringUtils.random(
                6,
                48,
                58,
                false,
                true,
                null,
                new Random()
        );
    }

}
