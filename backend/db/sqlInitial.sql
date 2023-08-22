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
        foreign key (QuestionID) references Questions (question_id)
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
INSERT INTO Questions (question_id, QuestionText)
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
                                                          ('admin', 'admin12', 'admin@example.com', 1), -- Assuming role 1 is for administrators
                                                          ('test', 'test12', 'test@example.com', 2); -- Assuming role 2 is for regular users


CREATE TABLE `role` (
                        `id_role` int(11) NOT NULL,
                        `role_type` enum('admin','user') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

# 21/08
# drop table answers;
# drop table questions;
# drop table usersscore;

CREATE TABLE Questions (
                           question_id INT PRIMARY KEY,
                           module_id INT,
                           question TEXT,
                           FOREIGN KEY (module_id) REFERENCES Module(module_id)
);

CREATE TABLE Choices (
                         choice_id INT PRIMARY KEY,
                         question_id INT,
                         choices VARCHAR(255),
                         is_correct TINYINT(1),
                         FOREIGN KEY (question_id) REFERENCES Questions(question_id)
);

CREATE TABLE user_quiz (
                           userid INT PRIMARY KEY,
                           score INT
);

create table quiz_taken
(
    userid int not null
        primary key,
    quiz_taken  int not null default 0
);

create table user_quiz
(
    userid int not null
        primary key,
    score  int null

);
ALTER TABLE user_quiz
ADD FOREIGN KEY (userid) REFERENCES users(id);

ALTER TABLE module
ADD COLUMN module_img VARCHAR(255);

insert into module (module_name, module_img) VALUES ('test','https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png'),
                                                    ('geometry', 'https://logos-world.net/wp-content/uploads/2023/02/JavaScript-Logo.png');

insert into questions (module_id, question)
VALUES (1, 'testing question 1' ),
       (1, 'testing question 2' ),
       (1, 'testing question 2' ),
       (2, 'Primele cifre din PI' );

insert into choices (question_id, choices, is_correct) VALUES
                                                           (1, 'response 1', 1),
                                                           (1, 'response 1', 0),
                                                           (1, 'response 1', 0),
                                                           (1, 'response 1', 0),
                                                           (4, '3.14', 1),
                                                           (4, '3.18', 0);

UPDATE quiz.module t
SET t.module_name = 'express'
WHERE t.module_id = 3;

UPDATE quiz.module t
SET t.module_name = 'angular'
WHERE t.module_id = 1;

UPDATE quiz.module t
SET t.module_name = 'typescript'
WHERE t.module_id = 4;

UPDATE quiz.module t
SET t.module_name = 'node'
WHERE t.module_id = 2;

insert into questions (module_id, question)
VALUES (4, 'What is TypeScript' ),
       (4, 'Which keyword is used to declare a variable in TypeScript' ),
       (4, 'TypeScript is a superset of which programming language' ),
       (4, 'Which data type is used to represent a boolean value in TypeScript' ),
       (4, 'What is the purpose of the "interface" keyword in TypeScript' ),
       (4, 'How can you explicitly specify the data type of a variable in TypeScript' ),
       (4, 'Which TypeScript feature allows you to define a new type by extending an existing type' ),
       (4, 'What is the purpose of the "class" keyword in TypeScript' ),
       (4, 'Which TypeScript feature allows you to enforce that a class must implement specific ' ),
       (4, 'How can you prevent a variable from being assigned the value "null" or "undefined" in TypeScript' );

insert into choices (question_id, choices, is_correct) VALUES
                                                           (5, ' A JavaScript library', 0),
                                                           (5, 'A programming language', 1),
                                                           (5, ' A browser extension', 0),
                                                           (5, ' A markup language', 0);

insert into choices (question_id, choices, is_correct) VALUES
                                                           (6, 'var', 0),
                                                           (6, 'obj', 0),
                                                           (6, 'const', 1),
                                                           (6, 'variable', 0);

insert into choices (question_id, choices, is_correct) VALUES
                                                           (7, 'Java', 0),
                                                           (7, 'Python', 0),
                                                           (7, 'C#', 0),
                                                           (7, 'Javascript', 1);

insert into choices (question_id, choices, is_correct) VALUES
                                                           (8, 'bool', 0),
                                                           (8, 'boolean', 1),
                                                           (8, 'bit', 0),
                                                           (8, 'boolen', 0);

insert into choices (question_id, choices, is_correct) VALUES
                                                           (9, 'To define a new class', 0),
                                                           (9, ' To define a new variable', 0),
                                                           (9, 'To define a contract for object structure', 1),
                                                           (9, 'To define a loop', 0);

insert into choices (question_id, choices, is_correct) VALUES
                                                           (10, 'Using the "data" keyword', 0),
                                                           (10, 'Using the "type" keyword', 1),
                                                           (10, 'Using the "as" keyword', 0),
                                                           (10, ' Using a colon and the data type', 0);

insert into choices (question_id, choices, is_correct) VALUES
                                                           (11, 'Inheritance', 1),
                                                           (11, 'Polymorphism', 0),
                                                           (11, 'Encapsulation', 0),
                                                           (11, 'Interface inheritance', 0);

insert into choices (question_id, choices, is_correct) VALUES
                                                           (12, 'To declare a function', 0),
                                                           (12, 'To define a new interface', 0),
                                                           (12, 'To define a new object', 0),
                                                           (12, 'To define a new class', 1);

insert into choices (question_id, choices, is_correct) VALUES
                                                           (13, 'Inheritance', 0),
                                                           (13, 'Abstract classes', 0),
                                                           (13, 'Interfaces', 1),
                                                           (13, 'Type guards', 0);

insert into choices (question_id, choices, is_correct) VALUES
                                                           (14, 'By using the "nonull" modifier', 0),
                                                           (14, 'By using the "non-nullable" type', 0),
                                                           (14, 'By using the "strict" mode', 0),
                                                           (14, 'By using the "!" symbol after the data type', 1);