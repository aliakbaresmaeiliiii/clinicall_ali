import { NavItemsService } from './nav-items.service';
export declare class NavItemsController {
    private readonly navItemsService;
    constructor(navItemsService: NavItemsService);
    findAll(): Promise<{
        message: string;
    }>;
}
