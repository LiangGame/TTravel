/**
 * Created by WWL on 2017/9/21.
 */
export class Pagination {

  /**
   * 构造函数，同时设置属性，初始值
   * @param pageLength 显示的页码数，奇数，默认7
   * @param currentPage 当前页码数，默认1
   * @param totalItems 总条数 默认0
   * @param pageItems 每页显示条数，默认10
   * @param changePage 翻页时调用的方法
   */
  constructor(
    public pageLength:number = 5,
    public currentPage:number = 1,
    public totalItems:number = 50,
    public pageItems:number = 5,
    public changePage:() => void
  ){}

  public static defaultPagination = new Pagination(5,1,50,5, function () {});
}
