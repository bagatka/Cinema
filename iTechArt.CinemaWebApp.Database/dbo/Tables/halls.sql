CREATE TABLE [dbo].[Halls] (
    [Id]       INT IDENTITY(1,1) NOT NULL,
    [Name]     NVARCHAR (200) NOT NULL,
    [Size]     INT NOT NULL,
    [CinemaId] INT NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    FOREIGN KEY ([CinemaId]) REFERENCES [dbo].[Cinemas] ([Id])
);

