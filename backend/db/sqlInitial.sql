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


# 22/08
drop table Choices;
drop table module;
drop table Questions;
drop table quiz_taken;
drop table user_quiz;

create table module
(
    module_id   int auto_increment
        primary key,
    module_name varchar(255) null,
    module_img  varchar(255) null
);

create table questions
(
    question_id int auto_increment
        primary key,
    module_id   int  null,
    question    text null,
    constraint questions_ibfk_1
        foreign key (module_id) references module (module_id)
);

create table choices
(
    choice_id   int auto_increment
        primary key,
    question_id int          null,
    choices     varchar(255) null,
    is_correct  tinyint(1)   null,
    constraint choices_ibfk_1
        foreign key (question_id) references questions (question_id)
);

create index question_id
    on choices (question_id);

create index module_id
    on questions (module_id);

create table quiz_taken
(
    userid     int           not null
        primary key,
    quiz_taken int default 0 not null
);

create table user_quiz
(
    userid      int not null
        primary key,
    score       int null,
    question_id int null,
    constraint user_quiz_ibfk_1
        foreign key (userid) references users (id)
);

INSERT INTO quiz.questions (question_id, module_id, question) VALUES (1, 1, 'testing question 1');
INSERT INTO quiz.questions (question_id, module_id, question) VALUES (2, 1, 'testing question 2');
INSERT INTO quiz.questions (question_id, module_id, question) VALUES (3, 1, 'testing question 2');
INSERT INTO quiz.questions (question_id, module_id, question) VALUES (4, 2, 'Primele cifre din PI');
INSERT INTO quiz.questions (question_id, module_id, question) VALUES (5, 4, 'What is TypeScript');
INSERT INTO quiz.questions (question_id, module_id, question) VALUES (6, 4, 'Which keyword is used to declare a variable in TypeScript');
INSERT INTO quiz.questions (question_id, module_id, question) VALUES (7, 4, 'TypeScript is a superset of which programming language');
INSERT INTO quiz.questions (question_id, module_id, question) VALUES (8, 4, 'Which data type is used to represent a boolean value in TypeScript');
INSERT INTO quiz.questions (question_id, module_id, question) VALUES (9, 4, 'What is the purpose of the "interface" keyword in TypeScript');
INSERT INTO quiz.questions (question_id, module_id, question) VALUES (10, 4, 'How can you explicitly specify the data type of a variable in TypeScript');
INSERT INTO quiz.questions (question_id, module_id, question) VALUES (11, 4, 'Which TypeScript feature allows you to define a new type by extending an existing type');
INSERT INTO quiz.questions (question_id, module_id, question) VALUES (12, 4, 'What is the purpose of the "class" keyword in TypeScript');
INSERT INTO quiz.questions (question_id, module_id, question) VALUES (13, 4, 'Which TypeScript feature allows you to enforce that a class must implement specific ');
INSERT INTO quiz.questions (question_id, module_id, question) VALUES (14, 4, 'How can you prevent a variable from being assigned the value "null" or "undefined" in TypeScript');


INSERT INTO quiz.module (module_id, module_name, module_img) VALUES (1, 'angular', 'https://miro.medium.com/v2/resize:fit:800/1*bc9pmTiyKR0WNPka2w3e0Q.png');
INSERT INTO quiz.module (module_id, module_name, module_img) VALUES (2, 'node', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png');
INSERT INTO quiz.module (module_id, module_name, module_img) VALUES (3, 'express', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png');
INSERT INTO quiz.module (module_id, module_name, module_img) VALUES (4, 'typescript', 'https://logos-world.net/wp-content/uploads/2023/02/JavaScript-Logo.png');

INSERT INTO quiz.choices (choice_id, question_id, choices, is_correct) VALUES (1, 1, 'response 1', 1);
INSERT INTO quiz.choices (choice_id, question_id, choices, is_correct) VALUES (2, 1, 'response 1', 0);
INSERT INTO quiz.choices (choice_id, question_id, choices, is_correct) VALUES (3, 1, 'response 1', 0);
INSERT INTO quiz.choices (choice_id, question_id, choices, is_correct) VALUES (4, 1, 'response 1', 0);
INSERT INTO quiz.choices (choice_id, question_id, choices, is_correct) VALUES (5, 4, '3.14', 1);
INSERT INTO quiz.choices (choice_id, question_id, choices, is_correct) VALUES (6, 4, '3.18', 0);
INSERT INTO quiz.choices (choice_id, question_id, choices, is_correct) VALUES (7, 5, ' A JavaScript library', 0);
INSERT INTO quiz.choices (choice_id, question_id, choices, is_correct) VALUES (8, 5, 'A programming language', 1);
INSERT INTO quiz.choices (choice_id, question_id, choices, is_correct) VALUES (9, 5, ' A browser extension', 0);
INSERT INTO quiz.choices (choice_id, question_id, choices, is_correct) VALUES (10, 5, ' A markup language', 0);
INSERT INTO quiz.choices (choice_id, question_id, choices, is_correct) VALUES (11, 6, 'var', 0);
INSERT INTO quiz.choices (choice_id, question_id, choices, is_correct) VALUES (12, 6, 'obj', 0);
INSERT INTO quiz.choices (choice_id, question_id, choices, is_correct) VALUES (13, 6, 'const', 1);
INSERT INTO quiz.choices (choice_id, question_id, choices, is_correct) VALUES (14, 6, 'variable', 0);
INSERT INTO quiz.choices (choice_id, question_id, choices, is_correct) VALUES (15, 7, 'Java', 0);
INSERT INTO quiz.choices (choice_id, question_id, choices, is_correct) VALUES (16, 7, 'Python', 0);
INSERT INTO quiz.choices (choice_id, question_id, choices, is_correct) VALUES (17, 7, 'C#', 0);
INSERT INTO quiz.choices (choice_id, question_id, choices, is_correct) VALUES (18, 7, 'Javascript', 1);
INSERT INTO quiz.choices (choice_id, question_id, choices, is_correct) VALUES (19, 8, 'bool', 0);
INSERT INTO quiz.choices (choice_id, question_id, choices, is_correct) VALUES (20, 8, 'boolean', 1);
INSERT INTO quiz.choices (choice_id, question_id, choices, is_correct) VALUES (21, 8, 'bit', 0);
INSERT INTO quiz.choices (choice_id, question_id, choices, is_correct) VALUES (22, 8, 'boolen', 0);
INSERT INTO quiz.choices (choice_id, question_id, choices, is_correct) VALUES (23, 9, 'To define a new class', 0);
INSERT INTO quiz.choices (choice_id, question_id, choices, is_correct) VALUES (24, 9, ' To define a new variable', 0);
INSERT INTO quiz.choices (choice_id, question_id, choices, is_correct) VALUES (25, 9, 'To define a contract for object structure', 1);
INSERT INTO quiz.choices (choice_id, question_id, choices, is_correct) VALUES (26, 9, 'To define a loop', 0);
INSERT INTO quiz.choices (choice_id, question_id, choices, is_correct) VALUES (27, 12, 'To declare a function', 0);
INSERT INTO quiz.choices (choice_id, question_id, choices, is_correct) VALUES (28, 12, 'To define a new interface', 0);
INSERT INTO quiz.choices (choice_id, question_id, choices, is_correct) VALUES (29, 12, 'To define a new object', 0);
INSERT INTO quiz.choices (choice_id, question_id, choices, is_correct) VALUES (30, 12, 'To define a new class', 1);
INSERT INTO quiz.choices (choice_id, question_id, choices, is_correct) VALUES (31, 13, 'Inheritance', 0);
INSERT INTO quiz.choices (choice_id, question_id, choices, is_correct) VALUES (32, 13, 'Abstract classes', 0);
INSERT INTO quiz.choices (choice_id, question_id, choices, is_correct) VALUES (33, 13, 'Interfaces', 1);
INSERT INTO quiz.choices (choice_id, question_id, choices, is_correct) VALUES (34, 13, 'Type guards', 0);
INSERT INTO quiz.choices (choice_id, question_id, choices, is_correct) VALUES (35, 14, 'By using the "nonull" modifier', 0);
INSERT INTO quiz.choices (choice_id, question_id, choices, is_correct) VALUES (36, 14, 'By using the "non-nullable" type', 0);
INSERT INTO quiz.choices (choice_id, question_id, choices, is_correct) VALUES (37, 14, 'By using the "strict" mode', 0);
INSERT INTO quiz.choices (choice_id, question_id, choices, is_correct) VALUES (38, 14, 'By using the "!" symbol after the data type', 1);


# 23/08
drop table user_quiz;

CREATE TABLE user_quiz
(
    userid      int not null,
    score       int null,
    question_id int null,
    primary key (userid, question_id),
    constraint user_quiz_ibfk_1
        foreign key (userid) references users (id)
);



create table `ionic-app`
(
    id        int auto_increment
        primary key,
    title     varchar(255) charset utf8mb3 not null,
    tag       varchar(55) charset utf8mb3  null,
    favorite  tinyint(1)                   not null,
    price     int                          not null,
    rating    int                          null,
    flashSale tinyint(1)                   null,
    img       varchar(255) charset utf8mb3 null,
    `desc`    varchar(255) charset utf8mb3 null,
    constraint `ionic-app_pk2`
        unique (title)
);

# TODO si de adaugat combined
# CREATE TABLE products (
#                           id INT AUTO_INCREMENT PRIMARY KEY,
#                           favorite BOOLEAN,
#                           price DECIMAL(10, 2),
#                           name VARCHAR(255),
#                           quantity INT,
#                           brand VARCHAR(255),
#                           category VARCHAR(255),
#                           text TEXT,
#                           uid INT,
#                           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
#                           updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
#                           FOREIGN KEY (uid) REFERENCES users(id)
# );
