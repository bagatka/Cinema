CREATE TABLE [dbo].[Orders] (
    [Id]        INT IDENTITY(1,1) NOT NULL,
    [UserId]    INT               NOT NULL,
    [Total]     MONEY             NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users] ([Id])
);
