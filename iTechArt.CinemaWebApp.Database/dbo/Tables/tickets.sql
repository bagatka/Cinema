CREATE TABLE [dbo].[Tickets] (
    [Id]      INT IDENTITY(1,1) NOT NULL,
    [Price]   MONEY             NOT NULL,
    [SeatId]  INT               NOT NULL,
    [ShowId]  INT               NOT NULL,
    [OrderId] INT               NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    FOREIGN KEY ([SeatId])  REFERENCES [dbo].[SeatsSchemas] ([Id]),
    FOREIGN KEY ([ShowId])  REFERENCES [dbo].[Shows] ([Id]),
    FOREIGN KEY ([OrderId]) REFERENCES [dbo].[Orders] ([Id])
);
