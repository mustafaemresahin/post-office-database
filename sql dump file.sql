USE [master]
GO
/****** Object:  Database [post-office]    Script Date: 3/2/2024 10:21:30 PM ******/
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
/****** Object:  Table [dbo].[Admin]    Script Date: 3/2/2024 10:21:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Admin](
	[AdminID] [varchar](10) NOT NULL,
	[Fname] [varchar](50) NOT NULL,
	[Minit] [varchar](1) NULL,
	[Lname] [varchar](50) NOT NULL,
	[Email] [varchar](255) NOT NULL,
	[Phone] [varchar](10) NOT NULL,
	[AdminUser] [varchar](255) NOT NULL,
	[AdminPass] [varchar](255) NOT NULL,
	[Address] [varchar](255) NOT NULL,
 CONSTRAINT [IX_Admin] UNIQUE NONCLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [IX_Admin_1] UNIQUE NONCLUSTERED 
(
	[Phone] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [IX_Admin_2] UNIQUE NONCLUSTERED 
(
	[AdminUser] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Branches]    Script Date: 3/2/2024 10:21:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Branches](
	[BranchesID] [varchar](10) NOT NULL,
	[Address] [varchar](255) NOT NULL,
	[ManagerID] [varchar](10) NOT NULL,
	[OperatingHours] [varchar](50) NOT NULL,
	[Schedule] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Branches] PRIMARY KEY CLUSTERED 
(
	[BranchesID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Customer]    Script Date: 3/2/2024 10:21:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Customer](
	[CustomerID] [varchar](10) NOT NULL,
	[Fname] [varchar](50) NOT NULL,
	[Minit] [varchar](1) NULL,
	[Lname] [varchar](50) NOT NULL,
	[Phone] [varchar](10) NOT NULL,
 CONSTRAINT [PK_Customer] PRIMARY KEY CLUSTERED 
(
	[CustomerID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [IX_Customer] UNIQUE NONCLUSTERED 
(
	[Phone] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Customer User]    Script Date: 3/2/2024 10:21:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Customer User](
	[UserID] [varchar](10) NOT NULL,
	[CustomerUser] [varchar](255) NOT NULL,
	[CustomerPass] [varchar](255) NOT NULL,
	[CustomerID] [varchar](10) NOT NULL,
	[Email] [varchar](255) NOT NULL,
 CONSTRAINT [PK_Customer User] PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [IX_Customer User] UNIQUE NONCLUSTERED 
(
	[CustomerID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [IX_Customer User_1] UNIQUE NONCLUSTERED 
(
	[CustomerUser] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [IX_Customer User_2] UNIQUE NONCLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Departments]    Script Date: 3/2/2024 10:21:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Departments](
	[DepartmentID] [varchar](10) NOT NULL,
	[Address] [varchar](255) NOT NULL,
	[OperatingHours] [varchar](50) NULL,
 CONSTRAINT [PK_Departments] PRIMARY KEY CLUSTERED 
(
	[DepartmentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Employee]    Script Date: 3/2/2024 10:21:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Employee](
	[EmployeeID] [varchar](10) NOT NULL,
	[Fname] [varchar](50) NOT NULL,
	[Minit] [varchar](1) NULL,
	[Lname] [varchar](50) NOT NULL,
	[Ssn] [varchar](9) NOT NULL,
	[Dob] [date] NOT NULL,
	[Phone] [varchar](10) NOT NULL,
	[Email] [varchar](255) NOT NULL,
	[Address] [varchar](255) NOT NULL,
	[Sex] [varchar](10) NOT NULL,
	[Salary] [decimal](18, 0) NOT NULL,
	[Role] [varchar](50) NOT NULL,
	[HireDate] [date] NOT NULL,
	[Schedule] [varchar](10) NOT NULL,
	[DepartmentID] [varchar](10) NOT NULL,
 CONSTRAINT [PK_Employee] PRIMARY KEY CLUSTERED 
(
	[EmployeeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [IX_Employee] UNIQUE NONCLUSTERED 
(
	[Ssn] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [IX_Employee_1] UNIQUE NONCLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [IX_Employee_2] UNIQUE NONCLUSTERED 
(
	[Phone] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Package]    Script Date: 3/2/2024 10:21:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Package](
	[PackageID] [varchar](10) NOT NULL,
	[SenderID] [varchar](10) NOT NULL,
	[ReceiverID] [varchar](10) NOT NULL,
	[Weight] [decimal](18, 0) NOT NULL,
	[Dimensions] [varchar](50) NOT NULL,
	[Type] [varchar](50) NOT NULL,
	[Status] [varchar](50) NOT NULL,
	[DateSent] [datetime] NOT NULL,
 CONSTRAINT [PK_Package] PRIMARY KEY CLUSTERED 
(
	[PackageID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Store Item]    Script Date: 3/2/2024 10:21:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Store Item](
	[ItemID] [varchar](10) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Cost] [decimal](18, 0) NOT NULL,
	[Inventory] [int] NOT NULL,
	[PostOfficeID] [varchar](10) NOT NULL,
 CONSTRAINT [PK_Store Item] PRIMARY KEY CLUSTERED 
(
	[ItemID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tracking History]    Script Date: 3/2/2024 10:21:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tracking History](
	[TrackingID] [varchar](10) NOT NULL,
	[PackageID] [varchar](10) NOT NULL,
	[Timestamp] [datetime] NOT NULL,
	[Location] [varchar](50) NOT NULL,
	[Status] [varchar](50) NOT NULL,
	[Description] [varchar](50) NOT NULL,
	[EstimatedDeliveryTime] [datetime] NULL,
 CONSTRAINT [PK_Tracking History] PRIMARY KEY CLUSTERED 
(
	[TrackingID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Transaction]    Script Date: 3/2/2024 10:21:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Transaction](
	[TransactionID] [varchar](10) NOT NULL,
	[TransactionType] [varchar](50) NOT NULL,
	[PackageID] [varchar](10) NOT NULL,
	[Date] [datetime] NOT NULL,
	[TotalAmount] [decimal](18, 0) NOT NULL,
	[ItemID] [varchar](10) NOT NULL,
	[PaymentType] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Transaction] PRIMARY KEY CLUSTERED 
(
	[TransactionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Vehicles]    Script Date: 3/2/2024 10:21:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Vehicles](
	[VehiclesID] [varchar](10) NOT NULL,
	[Timestamp] [datetime] NOT NULL,
	[Location] [varchar](50) NOT NULL,
	[Status] [varchar](50) NOT NULL,
	[Type] [varchar](50) NOT NULL,
	[Unit] [varchar](50) NOT NULL,
	[PackageID] [varchar](10) NOT NULL,
	[EmployeeID] [varchar](10) NOT NULL,
 CONSTRAINT [PK_Vehicles] PRIMARY KEY CLUSTERED 
(
	[VehiclesID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Branches]  WITH CHECK ADD  CONSTRAINT [Branch_Manager] FOREIGN KEY([ManagerID])
REFERENCES [dbo].[Employee] ([EmployeeID])
GO
ALTER TABLE [dbo].[Branches] CHECK CONSTRAINT [Branch_Manager]
GO
ALTER TABLE [dbo].[Customer User]  WITH CHECK ADD  CONSTRAINT [Customer User_Customer] FOREIGN KEY([CustomerID])
REFERENCES [dbo].[Customer] ([CustomerID])
GO
ALTER TABLE [dbo].[Customer User] CHECK CONSTRAINT [Customer User_Customer]
GO
ALTER TABLE [dbo].[Package]  WITH CHECK ADD  CONSTRAINT [Package_Receiver] FOREIGN KEY([ReceiverID])
REFERENCES [dbo].[Customer] ([CustomerID])
GO
ALTER TABLE [dbo].[Package] CHECK CONSTRAINT [Package_Receiver]
GO
ALTER TABLE [dbo].[Package]  WITH CHECK ADD  CONSTRAINT [Package_Sender] FOREIGN KEY([SenderID])
REFERENCES [dbo].[Customer] ([CustomerID])
GO
ALTER TABLE [dbo].[Package] CHECK CONSTRAINT [Package_Sender]
GO
ALTER TABLE [dbo].[Tracking History]  WITH CHECK ADD  CONSTRAINT [TrackingHistory_Package] FOREIGN KEY([PackageID])
REFERENCES [dbo].[Package] ([PackageID])
GO
ALTER TABLE [dbo].[Tracking History] CHECK CONSTRAINT [TrackingHistory_Package]
GO
ALTER TABLE [dbo].[Transaction]  WITH CHECK ADD  CONSTRAINT [Transaction_Package] FOREIGN KEY([PackageID])
REFERENCES [dbo].[Package] ([PackageID])
GO
ALTER TABLE [dbo].[Transaction] CHECK CONSTRAINT [Transaction_Package]
GO
ALTER TABLE [dbo].[Vehicles]  WITH CHECK ADD  CONSTRAINT [Vehicles_Employee] FOREIGN KEY([EmployeeID])
REFERENCES [dbo].[Employee] ([EmployeeID])
GO
ALTER TABLE [dbo].[Vehicles] CHECK CONSTRAINT [Vehicles_Employee]
GO
ALTER TABLE [dbo].[Vehicles]  WITH CHECK ADD  CONSTRAINT [Vehicles_Package] FOREIGN KEY([PackageID])
REFERENCES [dbo].[Package] ([PackageID])
GO
ALTER TABLE [dbo].[Vehicles] CHECK CONSTRAINT [Vehicles_Package]
GO
ALTER TABLE [dbo].[Employee]  WITH CHECK ADD  CONSTRAINT [CK_Dob_In_The_Past] CHECK  (([Dob]<getdate()))
GO
ALTER TABLE [dbo].[Employee] CHECK CONSTRAINT [CK_Dob_In_The_Past]
GO
ALTER TABLE [dbo].[Employee]  WITH CHECK ADD  CONSTRAINT [CK_Salary_Is_Greater_Than_Zero] CHECK  (([Salary]>(0)))
GO
ALTER TABLE [dbo].[Employee] CHECK CONSTRAINT [CK_Salary_Is_Greater_Than_Zero]
GO
ALTER TABLE [dbo].[Package]  WITH CHECK ADD  CONSTRAINT [CK_Weight_Is_Greater_Than_Zero] CHECK  (([Weight]>(0)))
GO
ALTER TABLE [dbo].[Package] CHECK CONSTRAINT [CK_Weight_Is_Greater_Than_Zero]
GO
ALTER TABLE [dbo].[Store Item]  WITH CHECK ADD  CONSTRAINT [CK_Cost_Is_Not_Negative] CHECK  (([Cost]>(0)))
GO
ALTER TABLE [dbo].[Store Item] CHECK CONSTRAINT [CK_Cost_Is_Not_Negative]
GO
ALTER TABLE [dbo].[Store Item]  WITH CHECK ADD  CONSTRAINT [CK_Inventory_Not_Negative] CHECK  (([Inventory]>=(0)))
GO
ALTER TABLE [dbo].[Store Item] CHECK CONSTRAINT [CK_Inventory_Not_Negative]
GO
ALTER TABLE [dbo].[Transaction]  WITH CHECK ADD  CONSTRAINT [CK_Date_Is_In_The_Past] CHECK  (([Date]<getdate()))
GO
ALTER TABLE [dbo].[Transaction] CHECK CONSTRAINT [CK_Date_Is_In_The_Past]
GO
ALTER TABLE [dbo].[Transaction]  WITH CHECK ADD  CONSTRAINT [CK_TotalAmount_Is_Positive] CHECK  (([TotalAmount]>(0)))
GO
ALTER TABLE [dbo].[Transaction] CHECK CONSTRAINT [CK_TotalAmount_Is_Positive]
GO
USE [master]
GO
ALTER DATABASE [post-office] SET  READ_WRITE 
GO
