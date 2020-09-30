CREATE TABLE [dbo].[Tickets] (
    [Id]     INT IDENTITY(1,1) NOT NULL,
    [ShowId] INT               NOT NULL,
    [UserId] INT               NOT NULL,
    [Price]  MONEY             NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    FOREIGN KEY ([ShowId]) REFERENCES [dbo].[Shows] ([Id]),
    FOREIGN KEY ([UserId]) REFERENCES [dbo].[users] ([Id])
);

