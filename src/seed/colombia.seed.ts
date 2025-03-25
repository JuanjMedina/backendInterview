import { AppDs } from '../config/data.source';
import { DepartmentsEntity } from '../departments/entity/departments.entity';
import { CityEntity } from '../cities/entity/cities.entity';
import * as colombiaData from '../utils/colombia.json';

/**
 * Seed script to populate database with Colombia's departments and cities
 */
const seedColombia = async () => {
  try {
    // Initialize connection
    const dataSource = await AppDs.initialize();
    console.log('Connection initialized');

    // Create repositories
    const departmentRepository = dataSource.getRepository(DepartmentsEntity);
    const cityRepository = dataSource.getRepository(CityEntity);

    // Load departments and cities
    for (const item of colombiaData) {
      // Create department
      const department = new DepartmentsEntity();
      department.nombre = item.departamento;

      // Save department first to get the ID
      const savedDepartment = await departmentRepository.save(department);
      console.log(`Department created: ${savedDepartment.nombre}`);

      // Create cities for this department
      for (const cityName of item.ciudades) {
        const city = new CityEntity();
        city.nombre = cityName;
        city.departamentoId = savedDepartment.id;
        await cityRepository.save(city);
      }
      console.log(
        `Added ${item.ciudades.length} cities for ${savedDepartment.nombre}`,
      );
    }

    console.log('Seed completed successfully!');
    await dataSource.destroy();
    console.log('Connection closed');
  } catch (error) {
    console.error('Error during seed process:', error);
  }
};

// Run the seed
seedColombia()
  .then(() => {
    console.log('Seed process completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Seed process failed:', error);
    process.exit(1);
  });
