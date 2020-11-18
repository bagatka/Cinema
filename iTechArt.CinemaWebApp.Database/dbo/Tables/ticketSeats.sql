CREATE TABLE [dbo].[TicketSeats] (
    [Id]     INT IDENTITY(1,1) NOT NULL,
    [Status] NVARCHAR (10)     NOT NULL,
    [SeatPositionId] INT               NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    FOREIGN KEY ([SeatPositionId]) REFERENCES [dbo].[SeatPositions] ([Id]),
)
