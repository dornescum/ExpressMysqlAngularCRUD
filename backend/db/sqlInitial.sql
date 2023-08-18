create table Questions
(
    QuestionID   int  not null
        primary key,
    QuestionText text not null
);

create table Answers
(
    AnswerID   int        not null
        primary key,
    QuestionID int        null,
    AnswerText text       not null,
    IsCorrect  tinyint(1) null,
    constraint Answers_ibfk_1
        foreign key (QuestionID) references Questions (QuestionID)
);

create index QuestionID
    on Answers (QuestionID);

create table Users
(
    UserID   int           not null
        primary key,
    Username varchar(255)  not null,
    Score    int default 0 null
);

INSERT INTO usersScore (UserID, Username, Score)
VALUES (1, 'User1', 0);
INSERT INTO Questions (QuestionID, QuestionText)
VALUES (1, 'What is the capital of France?');
INSERT INTO Answers (AnswerID, QuestionID, AnswerText, IsCorrect)
VALUES (1, 1, 'Paris', TRUE),
       (2, 1, 'London', FALSE),
       (3, 1, 'Berlin', FALSE),
       (4, 1, 'Madrid', FALSE);
SELECT AnswerText
FROM Answers
WHERE QuestionID = 1 AND IsCorrect = TRUE;
UPDATE usersScore
SET Score = Score + 1
WHERE UserID = 1;
# ====

CREATE TABLE `users` (
                         `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
                         `username` varchar(255) DEFAULT '',
                         `password` varchar(255) NOT NULL,
                         `email` varchar(255) NOT NULL,
                         `nickname` varchar(255) DEFAULT 'not set',
                         `age` int(10) DEFAULT 18,
                         `role` int(11) DEFAULT 2,
                         `photoUrl` text DEFAULT NULL,
                         `created_at` datetime NOT NULL DEFAULT current_timestamp(),
                         `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

INSERT INTO `users` (username, password, email, role) VALUES
                                                          ('test', 'test12', 'test@example.com', 2), -- Assuming role 2 is for regular users
                                                          ('admin', 'admin12', 'admin@example.com', 1); -- Assuming role 1 is for administrators


CREATE TABLE `role` (
                        `id_role` int(11) NOT NULL,
                        `role_type` enum('admin','user') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;