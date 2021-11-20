/**
 * Car advisor
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { HttpHeaders }                                       from '@angular/common/http';

import { Observable }                                        from 'rxjs';

import { CreateUserDto } from '../model/models';
import { GetUsersDto } from '../model/models';
import { SigninDto } from '../model/models';
import { UpdateUserDto } from '../model/models';
import { UserDto } from '../model/models';


import { Configuration }                                     from '../configuration';



export interface UsersServiceInterface {
    defaultHeaders: HttpHeaders;
    configuration: Configuration;

    /**
     * 
     * 
     * @param createUserDto 
     * @param xKey Auth key
     */
    create(createUserDto: CreateUserDto, xKey?: string, extraHttpRequestParams?: any): Observable<UserDto>;

    /**
     * 
     * 
     * @param getUsersDto 
     * @param xKey Auth key
     */
    findAll(getUsersDto: GetUsersDto, xKey?: string, extraHttpRequestParams?: any): Observable<Array<UserDto>>;

    /**
     * 
     * 
     * @param id 
     * @param xKey Auth key
     */
    findOne(id: number, xKey?: string, extraHttpRequestParams?: any): Observable<UserDto>;

    /**
     * 
     * 
     * @param id 
     * @param xKey Auth key
     */
    remove(id: number, xKey?: string, extraHttpRequestParams?: any): Observable<UserDto>;

    /**
     * 
     * 
     * @param signinDto 
     * @param xKey Auth key
     */
    signin(signinDto: SigninDto, xKey?: string, extraHttpRequestParams?: any): Observable<UserDto>;

    /**
     * 
     * 
     * @param xKey Auth key
     */
    signout(xKey?: string, extraHttpRequestParams?: any): Observable<{}>;

    /**
     * 
     * 
     * @param createUserDto 
     * @param xKey Auth key
     */
    signup(createUserDto: CreateUserDto, xKey?: string, extraHttpRequestParams?: any): Observable<UserDto>;

    /**
     * 
     * 
     * @param id 
     * @param updateUserDto 
     * @param xKey Auth key
     */
    update(id: number, updateUserDto: UpdateUserDto, xKey?: string, extraHttpRequestParams?: any): Observable<UserDto>;

    /**
     * 
     * 
     * @param xKey Auth key
     */
    whoami(xKey?: string, extraHttpRequestParams?: any): Observable<string>;

}