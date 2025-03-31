package com.paperize.paperize_server.file;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.paperize.paperize_server.folder.FolderEntity;
import com.paperize.paperize_server.permissions.PermissionsEntity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

@ToString(exclude = "folder")  // Add this annotation
@EqualsAndHashCode(exclude = "folder")  // Add this annotation
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "file")
public class FileEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "file_name", nullable = false)
    private String fileName;

    @Column(name = "type", nullable = false)
    private String type;

    @Column(name = "key", nullable = false)
    private String key;

    @Column(name = "size", nullable = false)
    private Long size;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "folder_id", nullable = false)
    @JsonBackReference
    private FolderEntity folder;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

}