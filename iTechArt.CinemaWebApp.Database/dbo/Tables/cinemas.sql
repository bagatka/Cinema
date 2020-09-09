CREATE TABLE [dbo].[cinemas] (
    [Id]          INT IDENTITY    NOT NULL,
    [Name]        NVARCHAR (50)   NOT NULL,
    [Description] NVARCHAR (1000) NOT NULL,
    [City]        NVARCHAR (50)   NOT NULL,
    [ImageUrl]    NVARCHAR (2048) NULL,
    PRIMARY KEY CLUSTERED ([id] ASC)
);

