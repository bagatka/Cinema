CREATE TABLE [dbo].[OrderAddons] (
    [Id]            INT IDENTITY(1,1) NOT NULL,
    [HallServiceId] INT               NOT NULL,
    [OrderId]       INT               NOT NULL,
    [Number]        INT               NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    FOREIGN KEY ([HallServiceId]) REFERENCES [dbo].[HallServices] ([Id]),
    FOREIGN KEY ([OrderId])       REFERENCES [dbo].[Orders] ([Id])
)
