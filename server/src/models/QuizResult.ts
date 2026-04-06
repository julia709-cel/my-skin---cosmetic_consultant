import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface QuizResultAttributes {
  id: number;
  userId?: number;
  skinType: string;
  problems: string[];
  goal: string;
  recommendations: Array<{
    productId: number;
    score: number;
    reason: string;
  }>;
  createdAt?: Date;
  updatedAt?: Date;
}

interface QuizResultCreationAttributes extends Optional<QuizResultAttributes, 'id'> {}

class QuizResult extends Model<QuizResultAttributes, QuizResultCreationAttributes> {
  public id!: number;
  public userId!: number;
  public skinType!: string;
  public problems!: string[];
  public goal!: string;
  public recommendations!: Array<{
    productId: number;
    score: number;
    reason: string;
  }>;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

QuizResult.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    skinType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    problems: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    goal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recommendations: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: [],
    },
  },
  {
    tableName: 'QuizResults',
    sequelize,
  }
);

export default QuizResult;