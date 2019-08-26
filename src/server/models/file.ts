import { BuildOptions, DataTypes, Model } from 'sequelize'

import { sequelizeInstance } from './'

export class FileModel extends Model {
  fileName!: string
}
export type FileStatic = typeof FileModel & {
  new (values?: object, options?: BuildOptions): FileModel
}
export const File = <FileStatic>sequelizeInstance.define(
  'files',
  {
    fileName: { type: DataTypes.STRING, primaryKey: true },
    userEmail: { type: DataTypes.STRING }
  },
  { tableName: 'files' }
)
