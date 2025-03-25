import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  direccion: string;

  @IsNotEmpty()
  @IsUUID()
  ciudadId: string;

  @IsNotEmpty()
  @IsUUID()
  departamentoId: string;
}

export class UpdateCompanyDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  direccion?: string;

  @IsOptional()
  @IsUUID()
  ciudadId?: string;

  @IsOptional()
  @IsUUID()
  departamentoId?: string;
}
