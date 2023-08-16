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

INSERT INTO Users (UserID, Username, Score)
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
UPDATE Users
SET Score = Score + 1
WHERE UserID = 1;
