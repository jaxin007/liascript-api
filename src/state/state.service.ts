import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { promises as fs } from 'node:fs';

@Injectable()
export class StateService {
  private readonly statesDirPath = path.join(__dirname, '../../states');

  private getUserStateFilePath(userId: string): string {
    return path.join(this.statesDirPath, `${userId}.json`);
  }

  async readStateFromFile(userId: string): Promise<any> {
    const filePath = this.getUserStateFilePath(userId);
    try {
      const data = await fs.readFile(filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return null;
    }
  }

  async writeStateToFile(userId: string, state: any) {
    const filePath = this.getUserStateFilePath(userId);
    await fs.writeFile(filePath, JSON.stringify(state, null, 2));
  }

  async saveState(userId: string, state: any) {
    await this.writeStateToFile(userId, state);
    return { message: 'State saved successfully' };
  }

  async getState(userId: string) {
    const state = await this.readStateFromFile(userId);
    if (state) {
      return state;
    } else {
      return { message: 'State not found' };
    }
  }
}
