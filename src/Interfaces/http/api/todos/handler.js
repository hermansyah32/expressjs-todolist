import TodoManUserCase from "../../../../Applications/use_case/todo/TodoManUseCase";
import { BodyResponse } from "../../../../Commons/Response/BodyResponse";

export default class TodoHandler {
  constructor(container) {
    this._container = container;
    this.index = this.index.bind(this);
    this.indexTrashed = this.indexTrashed.bind(this);
    this.show = this.show.bind(this);
    this.showTrashed = this.showTrashed.bind(this);
    this.store = this.store.bind(this);
    this.update = this.update.bind(this);
    this.restore = this.restore.bind(this);
    this.destroy = this.destroy.bind(this);
    this.forceDestroy = this.forceDestroy.bind(this);

  }

  async index(req, res, next) {
    try {
      /**@type {TodoManUserCase} */
      const todoManUserCase = this._container.getInstance(TodoManUserCase.name);
      const result = await todoManUserCase.index(req.param);
      const bodyResponse = new BodyResponse().setData(result).build();
      res.send(bodyResponse);
    } catch (error) {
      next(error);
    }
  }

  async indexTrashed(req, res, next) {
    try {
      /**@type {TodoManUserCase} */
      const todoManUserCase = this._container.getInstance(TodoManUserCase.name);
      const result = await todoManUserCase.indexTrashed(req.param);
      const bodyResponse = new BodyResponse().setData(result).build();
      res.send(bodyResponse);
    } catch (error) {
      next(error);
    }
  }

  async show(req, res, next) {
    try {
      /**@type {TodoManUserCase} */
      const todoManUserCase = this._container.getInstance(TodoManUserCase.name);
      const id = req.params.id;
      const result = await todoManUserCase.show(id);
      const bodyResponse = new BodyResponse().setData(result).build();
      res.send(bodyResponse);
    } catch (error) {
      next(error);
    }
  }

  async showTrashed(req, res, next) {
    try {
      /**@type {TodoManUserCase} */
      const todoManUserCase = this._container.getInstance(TodoManUserCase.name);
      const id = req.params.id;
      const result = await todoManUserCase.showTrashed(id);
      const bodyResponse = new BodyResponse().setData(result).build();
      res.send(bodyResponse);
    } catch (error) {
      next(error);
    }
  }

  async store(req, res, next) {
    try {
      /**@type {TodoManUserCase} */
      const todoManUserCase = this._container.getInstance(TodoManUserCase.name);
      const result = await todoManUserCase.store(req.body);
      const bodyResponse = new BodyResponse().setData(result).build();
      res.send(bodyResponse);
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      /**@type {TodoManUserCase} */
      const todoManUserCase = this._container.getInstance(TodoManUserCase.name);
      const id = req.params.id;
      const result = await todoManUserCase.update(id, req.body);
      const bodyResponse = new BodyResponse().setData(result).build();
      res.send(bodyResponse);
    } catch (error) {
      next(error)
    }
  }

  async restore(req, res, next) {
    try {
      /**@type {TodoManUserCase} */
      const todoManUserCase = this._container.getInstance(TodoManUserCase.name);
      const id = req.params.id;
      const result = await todoManUserCase.restore(id, req.body);
      const bodyResponse = new BodyResponse().setData(result).build();
      res.send(bodyResponse);
    } catch (error) {
      next(error)
    }
  }

  async destroy(req, res, next) {
    try {
      /**@type {TodoManUserCase} */
      const todoManUserCase = this._container.getInstance(TodoManUserCase.name);
      const id = req.params.id;
      const result = await todoManUserCase.destroy(id);
      const bodyResponse = new BodyResponse().build();
      res.send(bodyResponse);
    } catch (error) {
      next(error)
    }
  }

  async forceDestroy(req, res, next) {
    try {
      /**@type {TodoManUserCase} */
      const todoManUserCase = this._container.getInstance(TodoManUserCase.name);
      const id = req.params.id;
      const result = await todoManUserCase.permanentDestroy(id);
      const bodyResponse = new BodyResponse().build();
      res.send(bodyResponse);
    } catch (error) {
      next(error)
    }
  }
}
