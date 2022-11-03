import IndexSchema from "../../../Domains/IndexSchema";
import CreateTodo from "../../../Domains/todos/schemas/CreateTodo";

export default class TodoManUserCase {
  constructor(todoRepository) {
    this._todoRepository = todoRepository;
  }

  async index(payload) {
    const indexSchema = new IndexSchema(payload);
    const result = await this._todoRepository.index(indexSchema);
    return result;
  }

  async indexTrashed(payload) {
    const indexSchema = new IndexSchema(payload);
    const result = await this._todoRepository.indexTrashed(indexSchema);
    return result;
  }

  async store(payload){
    const createTodo = new CreateTodo(payload);
    const result = await this._todoRepository.store(createTodo);
    return result;
  }

  async show(id){
    const result = await this._todoRepository.getBy('id', id);
    return result;
  }

  async showTrashed(id){
    const result = await this._todoRepository.getTrashedBy('id', id);
    return result;
  }

  async update(id, payload){
    const result = await this._todoRepository.updateBy('id', id, payload);
    return result;
  }

  async restore(id){
    const result = await this._todoRepository.restoreBy('id', id);
    return result;
  }

  async destroy(id){
    const result = await this._todoRepository.destroyBy('id', id);
    return result;
  }

  async permanentDestroy(id){
    const result = await this._todoRepository.permanentDestroyBy('id', id);
    return result;
  }
}
