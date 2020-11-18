CREATE TABLE [dbo].[Tickets] (
    [Id]           INT IDENTITY(1,1) NOT NULL,
    [ShowId]       INT               NOT NULL,
    [OrderId]      INT               NOT NULL,
    [TicketSeatId] INT               NOT NULL
    PRIMARY KEY CLUSTERED ([Id] ASC),
    FOREIGN KEY ([TicketSeatId])  REFERENCES [dbo].[TicketSeats] ([Id]),
    FOREIGN KEY ([ShowId])        REFERENCES [dbo].[Shows] ([Id]),
    FOREIGN KEY ([OrderId])       REFERENCES [dbo].[Orders] ([Id])
);
