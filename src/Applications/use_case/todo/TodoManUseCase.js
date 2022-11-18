import IndexSchema from "../../../Domains/IndexSchema";
import CreatedTodo from "../../../Domains/todos/schemas/CreatedTodo";
import CreateTodo from "../../../Domains/todos/schemas/CreateTodo";
import ShowTodo from "../../../Domains/todos/schemas/ShowTodo";

export default class TodoManUserCase {
  constructor({todoRepository}) {
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
    const showTodo = new ShowTodo({id: id});
    const result = await this._todoRepository.getBy('id', showTodo.id);
    return result;
  }

  async showTrashed(id){
    const showTodo = new ShowTodo({id: id});
    const result = await this._todoRepository.getTrashedBy('id', showTodo.id);
    return result;
  }

  async update(id, payload){
    const createdTodo = new CreatedTodo({id: id, ...payload});
    const result = await this._todoRepository.updateBy('id', createdTodo.id, payload);
    return result;
  }

  async restore(id){
    const showTodo = new ShowTodo({id: id});
    const result = await this._todoRepository.restoreBy('id', showTodo.id);
    return result;
  }

  async destroy(id){
    const showTodo = new ShowTodo({id: id});
    const result = await this._todoRepository.destroyBy('id', showTodo.id);
    return result;
  }

  async permanentDestroy(id){
    const showTodo = new ShowTodo({id: id});
    const result = await this._todoRepository.permanentDestroyBy('id', showTodo.id);
    return result;
  }
}
