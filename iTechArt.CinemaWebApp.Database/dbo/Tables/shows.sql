CREATE TABLE [dbo].[Shows] (
    [Id]             INT IDENTITY(1,1) NOT NULL,
    [StartDatetime]  DATETIME          NOT NULL,
    [FilmId]         INT               NOT NULL,
    [HallId]         INT               NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    FOREIGN KEY ([FilmId]) REFERENCES [dbo].[Films] ([Id]),
    FOREIGN KEY ([HallId]) REFERENCES [dbo].[Halls] ([Id])
);
