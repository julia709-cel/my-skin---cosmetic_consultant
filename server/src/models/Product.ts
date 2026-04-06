import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface ProductAttributes {
  id: number;
  name: string;
  description: string;
  price: number;
  category: 'cleanser' | 'toner' | 'serum' | 'moisturizer' | 'sunscreen';
  skinType: string[]; // ['oily', 'dry', 'normal', 'combination']
  problems: string[]; // ['acne', 'wrinkles', 'dryness', 'pigmentation']
  goal: string[]; // ['hydration', 'anti-aging', 'cleansing', 'protection']
  imageUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> {}

class Product extends Model<ProductAttributes, ProductCreationAttributes> {
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public category!: string;
  public skinType!: string[];
  public problems!: string[];
  public goal!: string[];
  public imageUrl!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM('cleanser', 'toner', 'serum', 'moisturizer', 'sunscreen'),
      allowNull: false,
    },
    skinType: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    problems: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    goal: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'Products',
    sequelize,
  }
);

export default Product;