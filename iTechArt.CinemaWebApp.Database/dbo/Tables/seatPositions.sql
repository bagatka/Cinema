CREATE TABLE [dbo].[SeatPositions] (
    [Id]         INT IDENTITY(1,1) NOT NULL,
    [Seat]       INT               NOT NULL,
    [Row]        INT               NOT NULL,
    [SeatTypeId] INT               NOT NULL,
    [HallId]     INT               NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    FOREIGN KEY ([HallId]) REFERENCES [dbo].[Halls] ([Id]),
    FOREIGN KEY ([SeatTypeId]) REFERENCES [dbo].[SeatTypes] ([Id])
);
