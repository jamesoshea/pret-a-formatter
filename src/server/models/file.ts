import { BuildOptions, DataTypes, Model } from 'sequelize'

import { sequelizeInstance } from './'
import { User } from './auth'

export class FileModel extends Model {
  email!: string
  password!: string
  name!: string
}
export type FileStatic = typeof FileModel & {
  new (values?: object, options?: BuildOptions): FileModel
}
export const File = <FileStatic>sequelizeInstance.define(
  'files',
  {
    fileName: { type: DataTypes.STRING, primaryKey: true }
  },
  { tableName: 'files', timestamps: false }
)
