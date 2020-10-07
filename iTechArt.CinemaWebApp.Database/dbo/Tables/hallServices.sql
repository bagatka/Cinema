CREATE TABLE [dbo].[HallServices] (
    [Id]        INT IDENTITY(1,1) NOT NULL,
    [ServiceId] INT               NOT NULL,
    [HallId]    INT               NOT NULL,
    [Price]     MONEY             NOT NULL,
    [Available] BIT               NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    FOREIGN KEY ([HallId]) REFERENCES [dbo].[Halls] ([Id]),
    FOREIGN KEY ([ServiceId]) REFERENCES [dbo].[Services] ([Id])
);

