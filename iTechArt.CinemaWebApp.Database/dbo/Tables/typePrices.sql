CREATE TABLE [dbo].[TypePrices] (
    [Id]     INT IDENTITY(1,1) NOT NULL,
    [Price]  MONEY             NOT NULL,
    [SeatTypeId] INT               NOT NULL,
    [ShowId] INT               NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    FOREIGN KEY ([ShowId]) REFERENCES [dbo].[Shows] ([Id]),
    FOREIGN KEY ([SeatTypeId]) REFERENCES [dbo].[SeatTypes] ([Id])
);
