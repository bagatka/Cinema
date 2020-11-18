CREATE TABLE [dbo].[SeatTypes] (
    [Id]   INT IDENTITY(1,1) NOT NULL,
    [Type] NVARCHAR(30)      NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);