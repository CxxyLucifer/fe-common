export interface IOption {
    host: string;
}

export interface LoginUserInfo {
    userId: string;
    userName: string;
    userNameZh: string;
    token: string;
  }

export interface AijiaCompanyList {
    companyId: number;
    companyName: string;
    companyCode: string;
    creator: number;
    createTime: Date;
    updateTime: Date;
    delFlag: number;
}

export interface AijiaCompany {
    companyId: number;
    companyName: string;
    companyCode: string;
    creator: number;
    createTime: Date;
    updateTime: Date;
    delFlag: number;
}

export interface Data {
    domainId: number;
    userId: string;
    id: number;
    userName: string;
    password: string;
    passwordOriginal?: any;
    userNameZh: string;
    email: string;
    mobile: string;
    position: string;
    remark: string;
    addTime: Date;
    updateTime: Date;
    delFlag: number;
    active: boolean;
    wechatId: string;
    roleCode: string;
    roleName: string;
    roleCodeList: string[];
    aijiaCompanyList: AijiaCompanyList[];
    organizations?: any;
    aijiaCompany: AijiaCompany;
}

export interface TokenConfig {
    id: number;
    domainId: number;
    cookieName: string;
    cookieDomain: string;
    path: string;
    maxAge: number;
    httpOnly: boolean;
    secure: boolean;
    createTime: Date;
    updateTime: Date;
    delFlag: boolean;
}

export interface HIdConfig {
    id: number;
    domainId: number;
    cookieName: string;
    cookieDomain: string;
    path: string;
    maxAge: number;
    httpOnly: boolean;
    secure: boolean;
    createTime: Date;
    updateTime: Date;
    delFlag: boolean;
}

export interface UIdConfig {
    id: number;
    domainId: number;
    cookieName: string;
    cookieDomain: string;
    path: string;
    maxAge: number;
    httpOnly: boolean;
    secure: boolean;
    createTime: Date;
    updateTime: Date;
    delFlag: boolean;
}

export interface DIdConfig {
    id: number;
    domainId: number;
    cookieName: string;
    cookieDomain: string;
    path: string;
    maxAge: number;
    httpOnly: boolean;
    secure: boolean;
    createTime: Date;
    updateTime: Date;
    delFlag: boolean;
}

export interface SessionConfig {
    id: number;
    domainId: number;
    cookieName: string;
    cookieDomain: string;
    path: string;
    maxAge: number;
    httpOnly: boolean;
    secure: boolean;
    createTime: Date;
    updateTime: Date;
    delFlag: boolean;
}

export interface DomainConfig {
    domainId: number;
    domainName: string;
    loginUrl: string;
    tokenConfig: TokenConfig;
    hIdConfig: HIdConfig;
    uIdConfig: UIdConfig;
    dIdConfig: DIdConfig;
    sessionConfig: SessionConfig;
}

export interface LoginTokenInfo {
    domainConfig: DomainConfig;
    encryptHId: string;
    encryptUId: string;
    tokenValue: string;
    jwt: string;
    firstDomain: string;
    tokenId: number;
}

export interface LoginResDto {
    code: number;
    msg: string;
    data: Data;
    success: boolean;
    loginTokenInfo: LoginTokenInfo;
}

export interface Organization {
    id: number;
    name: string;
    orgId: number;
    source: number;
    parentId: number;
    parentIds: number[];
    addTime: Date;
    updateTime: Date;
    delFlag: number;
    leader: boolean;
}

export interface BetaUser {
    domainId: number;
    userId: string;
    id: number;
    userName: string;
    password?: any;
    passwordOriginal?: any;
    userNameZh: string;
    email: string;
    mobile: string;
    position: string;
    remark: string;
    addTime?: any;
    updateTime?: any;
    delFlag?: any;
    active: boolean;
    wechatId?: any;
    roleCode?: any;
    roleName?: any;
    roleCodeList?: any;
    aijiaCompanyList?: any;
    organizations: Organization[];
    aijiaCompany?: any;
}

export interface RoleDtoList {
    id: number;
    systemId: number;
    code?: any;
    name: string;
    icon?: any;
    parentId: number;
    sort: number;
    desc?: any;
    status: number;
    creator: number;
    createTime: Date;
    updateTime: Date;
    delFlag: number;
    companyId: number;
}

export interface CompanyList {
    id: number;
    name: string;
    code: string;
    creator: number;
    createTime: Date;
    updateTime: Date;
    delFlag: number;
}

export interface Datum {
    betaUser: BetaUser;
    roleDtoList: RoleDtoList[];
    companyList: CompanyList[];
}

export interface UserBetaResDto {
    code: number;
    msg: string;
    data: Datum[];
    success: boolean;
}

