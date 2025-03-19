"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityType = exports.activityLogsRelations = exports.teamMembersRelations = exports.invitationsRelations = exports.usersRelations = exports.teamsRelations = exports.invitations = exports.activityLogs = exports.teamMembers = exports.teams = exports.users = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var drizzle_orm_1 = require("drizzle-orm");
exports.users = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    name: (0, pg_core_1.varchar)('name', { length: 100 }),
    email: (0, pg_core_1.varchar)('email', { length: 255 }).notNull().unique(),
    passwordHash: (0, pg_core_1.text)('password_hash').notNull(),
    role: (0, pg_core_1.varchar)('role', { length: 20 }).notNull().default('member'),
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull().defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').notNull().defaultNow(),
    deletedAt: (0, pg_core_1.timestamp)('deleted_at'),
});
exports.teams = (0, pg_core_1.pgTable)('teams', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    name: (0, pg_core_1.varchar)('name', { length: 100 }).notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull().defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').notNull().defaultNow(),
    stripeCustomerId: (0, pg_core_1.text)('stripe_customer_id').unique(),
    stripeSubscriptionId: (0, pg_core_1.text)('stripe_subscription_id').unique(),
    stripeProductId: (0, pg_core_1.text)('stripe_product_id'),
    planName: (0, pg_core_1.varchar)('plan_name', { length: 50 }),
    subscriptionStatus: (0, pg_core_1.varchar)('subscription_status', { length: 20 }),
});
exports.teamMembers = (0, pg_core_1.pgTable)('team_members', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    userId: (0, pg_core_1.integer)('user_id')
        .notNull()
        .references(function () { return exports.users.id; }),
    teamId: (0, pg_core_1.integer)('team_id')
        .notNull()
        .references(function () { return exports.teams.id; }),
    role: (0, pg_core_1.varchar)('role', { length: 50 }).notNull(),
    joinedAt: (0, pg_core_1.timestamp)('joined_at').notNull().defaultNow(),
});
exports.activityLogs = (0, pg_core_1.pgTable)('activity_logs', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    teamId: (0, pg_core_1.integer)('team_id')
        .notNull()
        .references(function () { return exports.teams.id; }),
    userId: (0, pg_core_1.integer)('user_id').references(function () { return exports.users.id; }),
    action: (0, pg_core_1.text)('action').notNull(),
    timestamp: (0, pg_core_1.timestamp)('timestamp').notNull().defaultNow(),
    ipAddress: (0, pg_core_1.varchar)('ip_address', { length: 45 }),
});
exports.invitations = (0, pg_core_1.pgTable)('invitations', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    teamId: (0, pg_core_1.integer)('team_id')
        .notNull()
        .references(function () { return exports.teams.id; }),
    email: (0, pg_core_1.varchar)('email', { length: 255 }).notNull(),
    role: (0, pg_core_1.varchar)('role', { length: 50 }).notNull(),
    invitedBy: (0, pg_core_1.integer)('invited_by')
        .notNull()
        .references(function () { return exports.users.id; }),
    invitedAt: (0, pg_core_1.timestamp)('invited_at').notNull().defaultNow(),
    status: (0, pg_core_1.varchar)('status', { length: 20 }).notNull().default('pending'),
});
exports.teamsRelations = (0, drizzle_orm_1.relations)(exports.teams, function (_a) {
    var many = _a.many;
    return ({
        teamMembers: many(exports.teamMembers),
        activityLogs: many(exports.activityLogs),
        invitations: many(exports.invitations),
    });
});
exports.usersRelations = (0, drizzle_orm_1.relations)(exports.users, function (_a) {
    var many = _a.many;
    return ({
        teamMembers: many(exports.teamMembers),
        invitationsSent: many(exports.invitations),
    });
});
exports.invitationsRelations = (0, drizzle_orm_1.relations)(exports.invitations, function (_a) {
    var one = _a.one;
    return ({
        team: one(exports.teams, {
            fields: [exports.invitations.teamId],
            references: [exports.teams.id],
        }),
        invitedBy: one(exports.users, {
            fields: [exports.invitations.invitedBy],
            references: [exports.users.id],
        }),
    });
});
exports.teamMembersRelations = (0, drizzle_orm_1.relations)(exports.teamMembers, function (_a) {
    var one = _a.one;
    return ({
        user: one(exports.users, {
            fields: [exports.teamMembers.userId],
            references: [exports.users.id],
        }),
        team: one(exports.teams, {
            fields: [exports.teamMembers.teamId],
            references: [exports.teams.id],
        }),
    });
});
exports.activityLogsRelations = (0, drizzle_orm_1.relations)(exports.activityLogs, function (_a) {
    var one = _a.one;
    return ({
        team: one(exports.teams, {
            fields: [exports.activityLogs.teamId],
            references: [exports.teams.id],
        }),
        user: one(exports.users, {
            fields: [exports.activityLogs.userId],
            references: [exports.users.id],
        }),
    });
});
var ActivityType;
(function (ActivityType) {
    ActivityType["SIGN_UP"] = "SIGN_UP";
    ActivityType["SIGN_IN"] = "SIGN_IN";
    ActivityType["SIGN_OUT"] = "SIGN_OUT";
    ActivityType["UPDATE_PASSWORD"] = "UPDATE_PASSWORD";
    ActivityType["DELETE_ACCOUNT"] = "DELETE_ACCOUNT";
    ActivityType["UPDATE_ACCOUNT"] = "UPDATE_ACCOUNT";
    ActivityType["CREATE_TEAM"] = "CREATE_TEAM";
    ActivityType["REMOVE_TEAM_MEMBER"] = "REMOVE_TEAM_MEMBER";
    ActivityType["INVITE_TEAM_MEMBER"] = "INVITE_TEAM_MEMBER";
    ActivityType["ACCEPT_INVITATION"] = "ACCEPT_INVITATION";
})(ActivityType || (exports.ActivityType = ActivityType = {}));
