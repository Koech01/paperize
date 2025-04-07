package com.paperize.paperize_server.jobs.handlers;

import com.paperize.paperize_server.config.ApplicationProperties;
import com.paperize.paperize_server.email.EmailService;
import com.paperize.paperize_server.jobs.SendWelcomeEmailJob;
import com.paperize.paperize_server.user.UserEntity;
import com.paperize.paperize_server.user.VerificationCodeEntity;
import com.paperize.paperize_server.user.repository.UserRepository;
import com.paperize.paperize_server.user.repository.VerificationCodeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jobrunr.jobs.lambdas.JobRequestHandler;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.thymeleaf.spring6.SpringTemplateEngine;
import org.thymeleaf.context.Context;

import java.util.List;

@Component
@Slf4j
@RequiredArgsConstructor
public class SendWelcomeEmailJobHandler implements JobRequestHandler<SendWelcomeEmailJob> {

    private final UserRepository userRepository;
    private final VerificationCodeRepository verificationCodeRepository;
    private final SpringTemplateEngine templateEngine;
    private final EmailService emailService;
    private final ApplicationProperties applicationProperties;

    @Override
    @Transactional
    public void run(SendWelcomeEmailJob sendWelcomeEmailJob) throws Exception {
        UserEntity user = userRepository.findById(sendWelcomeEmailJob.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
        log.info("Sending welcome email to user with email: {}", sendWelcomeEmailJob.getUserId());
        if (user.getVerificationCode() != null && !user.getVerificationCode().isEmailSent()) {
            sendWelcomeEmail(user, user.getVerificationCode());
            log.info("Sent, verification code {}", user.getVerificationCode());
        }
    }

    private void sendWelcomeEmail(UserEntity user, VerificationCodeEntity code) {
        String verificationLink = applicationProperties.getBaseUrl() + "/api/auth/verify-email?token=" + code.getCode();
        Context thymeleafContext = new Context();
        thymeleafContext.setVariable("user", user);
        thymeleafContext.setVariable("verificationLink", verificationLink);
        thymeleafContext.setVariable("applicationName", applicationProperties.getApplicationName());
        String htmlBody = templateEngine.process("welcome-email", thymeleafContext);

        log.info(List.of(user.getEmail(), "Welcome to our platform", htmlBody).toString());
        emailService.sendHtmlMessage(List.of(user.getEmail()), "Welcome to our platform", htmlBody);

        code.setEmailSent(true);
        verificationCodeRepository.save(code);
    }
}
