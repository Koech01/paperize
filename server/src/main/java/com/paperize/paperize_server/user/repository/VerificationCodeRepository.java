package com.paperize.paperize_server.user.repository;

import com.paperize.paperize_server.user.VerificationCodeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface VerificationCodeRepository extends JpaRepository<VerificationCodeEntity, UUID> {
}
