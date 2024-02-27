USE [master]
GO
/****** Object:  Database [post-office]    Script Date: 2/26/2024 6:48:45 PM ******/
CREATE DATABASE [post-office]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'post-office', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\post-office.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'post-office_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\post-office_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [post-office] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [post-office].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [post-office] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [post-office] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [post-office] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [post-office] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [post-office] SET ARITHABORT OFF 
GO
ALTER DATABASE [post-office] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [post-office] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [post-office] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [post-office] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [post-office] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [post-office] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [post-office] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [post-office] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [post-office] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [post-office] SET  DISABLE_BROKER 
GO
ALTER DATABASE [post-office] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [post-office] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [post-office] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [post-office] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [post-office] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [post-office] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [post-office] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [post-office] SET RECOVERY FULL 
GO
ALTER DATABASE [post-office] SET  MULTI_USER 
GO
ALTER DATABASE [post-office] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [post-office] SET DB_CHAINING OFF 
GO
ALTER DATABASE [post-office] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [post-office] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [post-office] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [post-office] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'post-office', N'ON'
GO
ALTER DATABASE [post-office] SET QUERY_STORE = ON
GO
ALTER DATABASE [post-office] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [post-office]
GO
/****** Object:  Table [dbo].[Customer]    Script Date: 2/26/2024 6:48:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Customer](
	[customerID] [int] NOT NULL,
	[customerFirstName] [varchar](50) NOT NULL,
	[customerMiddleInitial] [varchar](1) NULL,
	[customerLastName] [varchar](50) NOT NULL,
	[customerAddress] [varchar](50) NOT NULL,
	[customerPhone] [varchar](10) NOT NULL,
	[customerPassword] [varchar](50) NOT NULL,
	[customerEmail] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Customer] PRIMARY KEY CLUSTERED 
(
	[customerID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Employee]    Script Date: 2/26/2024 6:48:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Employee](
	[employeeID] [nchar](10) NOT NULL,
	[employeeFirstName] [varchar](50) NOT NULL,
	[employeeMiddleInitial] [varchar](1) NULL,
	[employeeLastName] [varchar](50) NOT NULL,
	[employeeAddress] [varchar](50) NOT NULL,
	[employeePhone] [nchar](10) NOT NULL,
	[employeeEmail] [varchar](50) NOT NULL,
	[employeePOID] [nchar](10) NOT NULL,
 CONSTRAINT [PK_Employee] PRIMARY KEY CLUSTERED 
(
	[employeeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Item]    Script Date: 2/26/2024 6:48:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Item](
	[itemID] [nchar](10) NOT NULL,
	[itemName] [varchar](50) NOT NULL,
	[itemCOst] [nchar](10) NOT NULL,
	[itemInventory] [nchar](10) NOT NULL,
	[itemPOID] [nchar](10) NOT NULL,
 CONSTRAINT [PK_Item] PRIMARY KEY CLUSTERED 
(
	[itemID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Office]    Script Date: 2/26/2024 6:48:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Office](
	[officeID] [nchar](10) NOT NULL,
	[officeAddress] [varchar](50) NOT NULL,
	[officeTime] [nchar](10) NOT NULL,
	[officePhone] [nchar](10) NOT NULL,
	[officeEmail] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Office] PRIMARY KEY CLUSTERED 
(
	[officeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Package]    Script Date: 2/26/2024 6:48:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Package](
	[packageTrackingNumber] [nchar](10) NOT NULL,
	[packageSenderID] [nchar](10) NOT NULL,
	[packageReceiverID] [nchar](10) NOT NULL,
	[packageWeight] [nchar](10) NOT NULL,
	[packageSize] [nchar](10) NOT NULL,
	[packageCost] [nchar](10) NOT NULL,
	[packageStatus] [varchar](50) NOT NULL,
	[packageLocation] [varchar](50) NOT NULL,
	[packageFormFactor] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Package] PRIMARY KEY CLUSTERED 
(
	[packageTrackingNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Payment]    Script Date: 2/26/2024 6:48:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Payment](
	[paymentID] [nchar](10) NOT NULL,
	[paymentMethod] [varchar](50) NOT NULL,
	[paymentCardNumber] [nchar](20) NOT NULL,
	[paymentSecurityCode] [nchar](10) NOT NULL,
	[paymentName] [varchar](50) NOT NULL,
	[paymentExp] [date] NOT NULL,
	[paymentAddress] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Payment] PRIMARY KEY CLUSTERED 
(
	[paymentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Transaction]    Script Date: 2/26/2024 6:48:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Transaction](
	[transactionID] [nchar](10) NOT NULL,
	[transactionTrackingNumber] [nchar](10) NOT NULL,
	[transactionDate] [date] NOT NULL,
	[transactionAmount] [nchar](10) NOT NULL,
	[transactionItemID] [nchar](10) NOT NULL,
	[transactionPaymentID] [nchar](10) NOT NULL,
	[transactionCustomerID] [nchar](10) NOT NULL,
 CONSTRAINT [PK_Transaction] PRIMARY KEY CLUSTERED 
(
	[transactionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
USE [master]
GO
ALTER DATABASE [post-office] SET  READ_WRITE 
GO
