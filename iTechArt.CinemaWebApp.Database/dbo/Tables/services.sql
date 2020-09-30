CREATE TABLE [dbo].[Services] (
    [Id]          INT IDENTITY(1,1) NOT NULL,
    [Name]        NVARCHAR (64)     NOT NULL,
    [Description] NVARCHAR (512)    NOT NULL,
    [IconUrl]     NVARCHAR (2048)   NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

