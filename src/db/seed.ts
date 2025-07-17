// src/db/seed.ts
import { db } from './db';
import { lanes, steps, connections } from './schemas'; // Importa do agregador
import fakeData from '../fake-data.json'; // Importa o JSON

async function seed() {
  console.log('🌱 Iniciando o seed do banco de dados...');

  try {
    // 1. Limpar tabelas na ordem inversa para evitar erros de chave estrangeira
    console.log('🗑️  Limpando dados antigos...');
    await db.delete(connections);
    await db.delete(steps);
    await db.delete(lanes);
    console.log('✅ Tabelas limpas.');

    // 2. Inserir Lanes
    console.log('Inserting Lanes...');
    await db.insert(lanes).values(fakeData.lanes);
    console.log('✅ Lanes inseridas.');

    // 3. Inserir Steps (convertendo 'technologies' para string)
    console.log('Inserting Steps...');
    const stepsToInsert = fakeData.steps.map(step => ({
      ...step,
      technologies: JSON.stringify(step.technologies),
    }));
    await db.insert(steps).values(stepsToInsert);
    console.log('✅ Steps inseridos.');

    // 4. Inserir Connections
    console.log('Inserting Connections...');
    await db.insert(connections).values(fakeData.connections);
    console.log('✅ Connections inseridas.');

    console.log('\n🎉 Seed do banco de dados concluído com sucesso!');
  } catch (error) {
    console.error('❌ Erro durante o processo de seed:', error);
    process.exit(1);
  } finally {
    // É uma boa prática fechar a conexão, mas para um script simples não é crítico.
    console.log('🌱 Processo finalizado.');
    process.exit(0);
  }
}

seed();