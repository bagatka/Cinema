CREATE TABLE [dbo].[films] (
    [id]          INT             NOT NULL,
    [title]       NVARCHAR (200)  NOT NULL,
    [description] NVARCHAR (1000) NOT NULL,
    [poster_url]  VARCHAR (2048)  NULL,
    [banner_url]  VARCHAR (2048)  NULL,
    PRIMARY KEY CLUSTERED ([id] ASC)
);

