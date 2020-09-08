CREATE TABLE [dbo].[cinemas] (
    [id]          INT             NOT NULL,
    [name]        NVARCHAR (50)   NOT NULL,
    [description] NVARCHAR (1000) NOT NULL,
    [city]        NVARCHAR (50)   NOT NULL,
    [image_url]   VARCHAR (2048)  NULL,
    PRIMARY KEY CLUSTERED ([id] ASC)
);

