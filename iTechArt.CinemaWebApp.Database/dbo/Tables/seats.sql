CREATE TABLE [dbo].[Seats] (
    [Id]     INT IDENTITY(1,1) NOT NULL,
    [Seat]   INT               NOT NULL,
    [Row]    INT               NOT NULL,
    [Type]   NVARCHAR (10)     NOT NULL,
    [HallId] INT               NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    FOREIGN KEY ([HallId]) REFERENCES [dbo].[Halls] ([Id])
);
