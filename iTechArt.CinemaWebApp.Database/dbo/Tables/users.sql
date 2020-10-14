CREATE TABLE [dbo].[Users] (
    [Id]           INT IDENTITY(1,1) NOT NULL,
    [Email]        NVARCHAR (320)    NOT NULL,
    [FirstName]    NVARCHAR (256)    NOT NULL,
    [LastName]     NVARCHAR (256)    NOT NULL,
    [UserName]     NVARCHAR (256)    NOT NULL,
    [Role]         NVARCHAR (10)     NOT NULL,
    [PasswordHash] NVARCHAR (60)     NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);
