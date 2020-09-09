CREATE TABLE [dbo].[films] (
    [Id]          INT IDENTITY(1,1) NOT NULL,
    [Title]       NVARCHAR (200)    NOT NULL,
    [Description] NVARCHAR (1000)   NOT NULL,
    [PosterUrl]   NVARCHAR (2048)   NULL,
    [BannerUrl]   NVARCHAR (2048)   NULL,
    PRIMARY KEY CLUSTERED ([id] ASC)
);

